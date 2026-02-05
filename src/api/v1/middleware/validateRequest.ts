import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.details.map(d => d.message),
            });
            return;
        }
        req.body = value;
        next();
    };
};

export const validateParams = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            res.status(400).json({
                success: false,
                message: "Parameter validation failed",
                details: error.details.map(d => d.message),
            });
            return;
        }
        next();
    };
};
