const { menuMongooseModel } = require("./mongooseModel");

class Menu {
  static createOne = async ({name, numberOfPallets = 180, items = []}) => {
    return this.model.create({ name, numberOfPallets, items })
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
    return this.model.findOneAndUpdate({_id: id}, {$set: newMenu}, {new: true});
  }

  static addItem = async (menuId, newItem) => {
    const menu = await this.model.findById(menuId);
    menu.items.push(newItem)
    await menu.save();
    return menu.items.slice(-1)[0];
  }

  static delete = async (id) => {
    return this.model.deleteOne({ _id: id });
  }
}

Menu.model = menuMongooseModel;
module.exports = Menu;
