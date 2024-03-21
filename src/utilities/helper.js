class Helper {

    getDateTime = (data = new Date()) => {
        const year = data.getFullYear();
        const month = String(data.getMonth() + 1).padStart(2, '0');
        const day = String(data.getDate()).padStart(2, '0');
        const hours = String(data.getHours()).padStart(2, '0');
        const minutes = String(data.getMinutes()).padStart(2, '0');
        const seconds = String(data.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    getDateAfterThirtyDays = (days) => {
        const today = new Date();
        const thirtyDaysLater = new Date();
        thirtyDaysLater.setDate(today.getDate() + days);

        return this.getDateTime(thirtyDaysLater);
    }
    
    generateAlphanumericCode = (size) => {
        let code = '';
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < size; i++) {
          const indice = Math.floor(Math.random() * caracteres.length);
          code += caracteres.charAt(indice);
        }
      
        return code;
    }
}



module.exports = new Helper();