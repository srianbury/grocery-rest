import models from "../models";

function useModels(req, res, next) {
  req.context = {
    models
  };
  next();
}

export default useModels;
