import * as repository from '../repository/footer.js'



export const getFooter = (req,res,next)=>{
    const footer = repository.getFooter();
    res.json({"result":footer})
}