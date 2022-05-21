const { menuMongooseModel } = require("./mongooseModel");

class Menu {
  static createOne = async (name, numberOfMeals = 180, items = []) => {
    return this.model.create({ name, numberOfMeals, items })
  }

  static findById = async (id) => {
    return this.model.findById(id);
  }

  static find = async (queryObj) => {
    return this.model.findOne(queryObj);
  }

  static findAll = async () => {
    return this.model.find();
  }


  static update = async (id, newMenu) => {
    return this.model.updateOne({_id: id}, {$set: newMenu});
  }

  static delete = async (id) => {
    return this.model.deleteOne({ _id: id });
  }
}

Menu.model = menuMongooseModel;
module.exports = Menu;
