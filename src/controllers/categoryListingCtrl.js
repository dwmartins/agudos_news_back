const Category = require("../class/ListingCategory");

class ListingCategoryCtrl {
    new = async (req, res) => {
        const categoryBody = req.body;

        const category = new Category(categoryBody);
        const result = await category.save();

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao criar a categoria.'});
        }

        return this.sendResponse(res, 200, {success: 'Categoria criada com sucesso.'});
    }

    updateCategory = async (req, res) => {
        const categoryBody = req.body;

        const category = new Category(categoryBody);
        const result = await category.update();

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao atualizar a categoria.'});
        }

        return this.sendResponse(res, 200, {success: 'Categoria atualizado com sucesso.'});
    }

    deleteCategory = async (req, res) => {
        const categoryBody = req.body;

        const category = new Category(categoryBody);
        const result = await category.delete();


        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao delete a categoria.'});
        }

        return this.sendResponse(res, 200, {success: 'Categoria deletado com sucesso.'});
    }
}

module.exports = new ListingCategoryCtrl;