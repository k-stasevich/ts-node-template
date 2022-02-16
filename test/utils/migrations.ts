import util from 'util';
const exec = util.promisify(require('child_process').exec);

export const migrateUndoAll = async () => {
  console.time('migrate:undo');
  await exec('npm run migrate:undo');
  console.timeEnd('migrate:undo');
};

export const migrateAll = async () => {
  console.time('migrate');
  await exec('npm run migrate');
  console.timeEnd('migrate');
};

// Before each test reapply migrations so become empty
export const reapplyMigrations = async () => {
  await migrateUndoAll();
  await migrateAll();
};
