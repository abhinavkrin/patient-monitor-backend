import { Request } from "express";

export const parsePageNumber = function(page:any){
    let p = parseInt(page,10);
    return p ? ( p > 0 ? p : 1 ) : 1;
}

export const paginate = function(req: Request, limit:number = 10){
    const p = parseInt(String(req.query.page),10);
    const page:number = p > 1 ? p : 1;
    return {page,limit,skip: (page-1)*limit};
}
