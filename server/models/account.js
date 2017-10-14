import mongoose from 'mongoose';

const Account = new mongoose.Schema({
  username: String,
  password: String,
});

Account.index({ username: 1 }, { unique: true });

export default mongoose.model('account', Account);
