const asyncWrap = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}

export { asyncWrap }