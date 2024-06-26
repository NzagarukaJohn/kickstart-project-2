3import db from '../database/models/index.js';
const User = db['users'];

const updateUser = (user, userInfo) =>
  User.update(userInfo, {
    where: user,
    returning: true,
  });

export const updateRole = (req, res, next) => {
  const email = req.body.email;
  const role = req.body.role;

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.role === 'super admin') {
        return res
          .status(403)
          .json({ message: 'Super admin can not be updated' });
      }
      updateUser({ email: email }, { role: role });

      return res.status(200).json({ result: 'user role updated' });
    })
    .catch((error) => res.status(404).json({ error }));
};

export const updateRememberInfo = async (req, res, next) => {
  const userEmail = req.user.email;
  const user = await User.findOne({ where: { email: userEmail } });
  const response = await User.update(
    { remember_info: !user.remember_info },
    { where: { email: userEmail } },
  );
  return res.status(200).json({
    message: 'remember info option updated successfully',
    remember_info: !user.remember_info,
  });
};
