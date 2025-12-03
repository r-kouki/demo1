const Membership = require('../models/Membership');
const Plan = require('../models/Plan');

const computeStatus = (endDate) => {
  const today = new Date();
  return endDate >= today ? 'ACTIVE' : 'EXPIRED';
};

const getMemberships = async (req, res, next) => {
  try {
    const memberships = await Membership.find()
      .populate('member')
      .populate('plan')
      .exec();

    const updates = memberships.map(async (m) => {
      const status = computeStatus(m.endDate);
      if (m.status !== status) {
        m.status = status;
        await m.save();
      }
      return { ...m._doc, status };
    });

    const result = await Promise.all(updates);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createMembership = async (req, res, next) => {
  try {
    const { member, plan, startDate } = req.body;

    if (!member || !plan || !startDate) {
      res.status(400);
      throw new Error('member, plan et startDate sont requis');
    }

    const planDoc = await Plan.findById(plan);
    if (!planDoc) {
      res.status(404);
      throw new Error('Plan non trouvé');
    }

    const existingActive = await Membership.findOne({
      member,
      status: 'ACTIVE',
      endDate: { $gte: new Date() },
    });
    if (existingActive) {
      res.status(400);
      throw new Error('Ce membre a déjà un abonnement actif');
    }

    const start = new Date(startDate);
    const endDate = new Date(start);
    endDate.setMonth(endDate.getMonth() + planDoc.durationMonths);

    const status = computeStatus(endDate);

    const membership = await Membership.create({
      member,
      plan,
      startDate: start,
      endDate,
      status,
    });

    await membership.populate('member');
    await membership.populate('plan');
    res.status(201).json(membership);
  } catch (error) {
    next(error);
  }
};

const deleteMembership = async (req, res, next) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      res.status(404);
      throw new Error('Abonnement non trouvé');
    }
    await membership.deleteOne();
    res.json({ message: 'Abonnement supprimé' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMemberships, createMembership, deleteMembership };
