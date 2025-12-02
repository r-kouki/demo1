const Member = require('../models/Member');
const Plan = require('../models/Plan');
const Membership = require('../models/Membership');

// GET /api/stats/overview
const getOverviewStats = async (req, res, next) => {
  try {
    const totalMembers = await Member.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const today = new Date();

    const activeMemberships = await Membership.countDocuments({
      status: 'ACTIVE',
      endDate: { $gte: today },
    });

    const expiredMemberships = await Membership.countDocuments({
      endDate: { $lt: today },
    });

    // Revenu mensuel simple: somme des prix des plans actifs
    const activeList = await Membership.find({
      status: 'ACTIVE',
      endDate: { $gte: today },
    }).populate('plan');

    const monthlyRevenue = activeList.reduce((sum, m) => {
      const price = m.plan ? m.plan.price : 0;
      return sum + price;
    }, 0);

    res.json({
      totalMembers,
      totalPlans,
      activeMemberships,
      expiredMemberships,
      monthlyRevenue,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOverviewStats };
