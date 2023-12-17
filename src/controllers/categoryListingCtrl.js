const Category = require("../class/ListingCategory");
const categoryDAO = require("../models/listingCategoryDAO");

class ListingCategoryCtrl {
    new = async (req, res) => {
        const categoryBody = req.body;

        const category = new Category(categoryBody);

        const categoryExists = await categoryDAO.findByName(category.getCategoryName());

        if(categoryExists.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao criar a categoria.'});
        }

        if(!categoryExists.length) {
            const result = await category.save();

            if(result.error) {
                return this.sendResponse(res, 500, {error: 'Houve um erro ao criar a categoria.'});
            }
    
            return this.sendResponse(res, 200, {success: 'Categoria criada com sucesso.'});
        }

        this.sendResponse(res, 200, {alert: `Essa categoria já existe.`});
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
        const { id } = req.params;

        const result = await categoryDAO.deleteDAO(id);

        if(result.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao delete a categoria.'});
        }

        return this.sendResponse(res, 200, {success: 'Categoria deletado com sucesso.'});
    }

    list = async (req, res) => {
        const categories = await categoryDAO.findAll();

        if(categories.error) {
            return this.sendResponse(res, 500, {error: 'Houve um erro ao buscar as categorias.'});
        }

        return this.sendResponse(res, 200, categories);
    }

    sendResponse = (res, statusCode, msg) => {
        res.status(statusCode).json(msg);
    }
}

module.exports = new ListingCategoryCtrl;