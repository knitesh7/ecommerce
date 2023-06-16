const orderHandler = require('../models/order')
const orderFetcher = async (req, res) => {
    try {
        const order = await orderHandler.find({ buyer: req.params.id }).sort({ createdAt: -1 })


        if (!order) return res.status(400).json({ message: 'No order found' })

        return res.status(200).json({ order })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const allordersFetcher = async (req, res) => {
    try {
        const order = await orderHandler.find({}).populate({
            path: 'buyer',
            select: 'username',
            model: 'users',
            options: { strictPopulate: false }
        }).sort({ createdAt: -1 })
        console.log(order)

        if (!order) return res.status(400).json({ message: 'No order found' })

        return res.status(200).json({ order })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}

const shipStatusSetter = async(req,res)=>{
    const {_id,status} = req.body
    try {
        await orderHandler.findByIdAndUpdate(_id,{status})
        return res.sendStatus(200)
    } catch (error) {
        return res.status(500).json({data:error.message})
    }
}

module.exports = { orderFetcher, allordersFetcher,shipStatusSetter }