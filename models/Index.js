const Task = require('./Task');
const Label = require('./Label');

// Label 1–N Task
Label.hasMany(Task, {
  foreignKey: { name: 'labelId', field: 'label_id' },
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});
Task.belongsTo(Label, {
  foreignKey: { name: 'labelId', field: 'label_id' },
});

module.exports = { Task, Label };