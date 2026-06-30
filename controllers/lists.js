
const getAllLists = async (req,res) => {
      res.send('get all lists');
      
};

const getList = async (req,res) => {
      const {id} = req.params;
      res.send(`get list. Params: ${id}`);
      
};

const createList = async (req,res) => {
      res.send('create list');
      
};

const updateList = async (req,res) => {
      const {id} = req.params;
      res.send(`update list. Params: ${id}`);
      
};

const deleteList = async (req,res) => {
      const {id} = req.params;
      res.send(`delete list. Params: ${id}`);
      
};

module.exports = {
      getAllLists,
      getList,
      createList,
      updateList,
      deleteList
};