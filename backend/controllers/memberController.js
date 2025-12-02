const Member = require('../models/Member');
const Membership = require('../models/Membership');

// GET /api/members
const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    next(error);
  }
};

// POST /api/members
const createMember = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email } = req.body;
    const member = await Member.create({ firstName, lastName, phone, email });
    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
};

// PUT /api/members/:id
const updateMember = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      res.status(404);
      throw new Error('Adhérent non trouvé');
    }
    const { firstName, lastName, phone, email } = req.body;
    member.firstName = firstName || member.firstName;
    member.lastName = lastName || member.lastName;
    member.phone = phone || member.phone;
    member.email = email || member.email;
    const updated = await member.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/members/:id
const deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      res.status(404);
      throw new Error('Adhérent non trouvé');
    }

    // On bloque la suppression si un abonnement actif existe
    const activeMembership = await Membership.findOne({
      member: member._id,
      status: 'ACTIVE',
      endDate: { $gte: new Date() },
    });

    if (activeMembership) {
      res.status(400);
      throw new Error('Impossible de supprimer: adhérent avec un abonnement actif');
    }

    await member.deleteOne();
    res.json({ message: 'Adhérent supprimé' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMembers, createMember, updateMember, deleteMember };
