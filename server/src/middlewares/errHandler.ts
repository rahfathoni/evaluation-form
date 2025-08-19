import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): Response<any> {
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((el: any) => ({
      message: el.message
    }));
    return res.status(400).json({
      name: 'BadRequest',
      errors
    });
  } else if (err.name === `BadRequest`) {
      return res.status(400).json({
        name: `BadRequest`,
        errors: err.errors
      });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        name: `BadRequest`,
        errors: [{
          message: err.message
        }]
      });
  } else if (err.name === 'SequelizeDatabaseError') {
      return res.status(400).json({
        name: `BadRequest`,
        errors: [{
          message: `Input to Database error`
        }]
      });
  } else if (err.name === `NotFound`) {
      return res.status(404).json({
        name: `NotFound`,
        errors: [{
          message: err.errors[0].message
        }]
      });
  } else {
      return res.status(500).json({
        name: `InternalServerError`,
        errors: [{
          message: err.message
        }]
      });
  }
}
