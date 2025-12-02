const Plan = require('../models/Plan');
const Membership = require('../models/Membership');

// GET /api/plans
const getPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

// POST /api/plans
const createPlan = async (req, res, next) => {
  try {
    const { name, durationMonths, price, description } = req.body;
    const plan = await Plan.create({ name, durationMonths, price, description });
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
};

// PUT /api/plans/:id
const updatePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      res.status(404);
      throw new Error('Plan non trouvé');
    }
    const { name, durationMonths, price, description } = req.body;
    plan.name = name || plan.name;
    plan.durationMonths = durationMonths || plan.durationMonths;
    plan.price = price || plan.price;
    plan.description = description || plan.description;
    const updated = await plan.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/plans/:id
const deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      res.status(404);
      throw new Error('Plan non trouvé');
    }

    // On interdit la suppression si le plan est utilisé par au moins un abonnement
    const membershipUsingPlan = await Membership.findOne({ plan: plan._id });
    if (membershipUsingPlan) {
      res.status(400);
      throw new Error('Impossible de supprimer: plan déjà utilisé par un abonnement');
    }

    await plan.deleteOne();
    res.json({ message: 'Plan supprimé' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPlans, createPlan, updatePlan, deletePlan };
