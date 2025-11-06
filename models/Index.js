const Task = require('./Task');
const Label = require('./Label');
const User = require('./User');

Label.hasMany(Task, {
  foreignKey: { name: 'labelId', field: 'label_id' },
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});
Task.belongsTo(Label, { foreignKey: { name: 'labelId', field: 'label_id' } });

User.hasMany(Task, {
  foreignKey: { name: 'userId', field: 'user_id' },
  onDelete: 'CASCADE',
});
Task.belongsTo(User, { foreignKey: { name: 'userId', field: 'user_id' } });

module.exports = { Task, Label, User };
