import express from 'express';
import asyncify from 'express-asyncify';

export const IndexRouter = asyncify(express.Router());

IndexRouter.get('/', async (req, res, next) => {
    res.json({
        hello: 'world',
    });
});
