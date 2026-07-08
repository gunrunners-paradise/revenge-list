const asyncHandler = require('express-async-handler');
const List = require('../models/List');
const {StatusCodes} = require('http-status-codes');

const getAllLists = asyncHandler(async (req,res) => {
      const lists = await List
      .find({createdBy: req.user.userId})
      .sort('createdAt');
      res.status(StatusCodes.OK).json({count:lists.length, lists});
      
});

const getList = asyncHandler(async (req,res) => {
      const {user: {userId}, params: {id: listId}} = req;
      const list = await List.findOne({
            _id: listId,
            createdBy: userId
      });
      if (!list) {
            res.status(StatusCodes.BAD_REQUEST)
            .json({msg: `No list with the id ${listId}`});
      }
      
      res.status(StatusCodes.OK).json({list});
      
});

const createList = asyncHandler(async (req,res) => {
      req.body.createdBy = req.user.userId;
      const list = await List.create(req.body);
      res.status(StatusCodes.OK).json({list});
      
});

const updateList = async (req,res) => {
      const {
            body: {name,offense,revenge_plan,severity,status,due_date},
            user: {userId},
            params: {id:listId}
      } = req;
      if (name === '' || offense === '' || revenge_plan === '' ||
            severity === undefined || status === '' || due_date === '') {
                  res.status(StatusCodes.BAD_REQUEST)
                  .json({msg: 'Fields cannot be empty'});
      }
      if (!name || !offense || !revenge_plan ||
            !severity || !status || !due_date) {
                  res.status(StatusCodes.BAD_REQUEST)
                  .json({msg: 'Fields cannot be empty'});
      }
      const list = await List.findOneAndUpdate({
            _id: listId,
            createdBy: userId
      }, req.body, {new:true,runValidators:true});
      if (!list) {
            res.status(StatusCodes.NOT_FOUND)
            .json({msg: `No job with the id ${listId}`});
      }
      res.status(StatusCodes.OK).json({list});
      
};

const deleteList = async (req,res) => {
      const {user: {userId}, params: {id:listId}} = req;
      const list = await List
      .findByIdAndDelete({_id: listId,createdBy:userId});
      if (!list) {
            res.status(StatusCodes.BAD_REQUEST)
            .json({msg: `No list with the id ${listId}`});
      }
      res.status(StatusCodes.OK)
      .json({msg: "Deleted successfully"});
      
};

module.exports = {
      getAllLists,
      getList,
      createList,
      updateList,
      deleteList
};