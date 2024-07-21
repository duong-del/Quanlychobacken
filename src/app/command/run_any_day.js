import { User } from "../model/user.model";
import { detailareaMarket } from "../services/areaMarket.service";

class USER {
    constructor(_id, sumCost) {
        this._id = _id;
        this.sumCost = sumCost;
    }

    async updateUserUnpaid() {
        return await User.findByIdAndUpdate(this._id, { $inc: { unpaid: this.sumCost } });
    }
}

export default async function updateUserUnpaid() {
    const filter = { $expr: { $gt: [{ $size: "$areaCost" }, 0] } }; // tìm người đã thuê chỗ bán hàng
    const listUser = await User.find(filter);

    console.log(listUser,"===================");
    // Tính toán sumCost cho mỗi user
    const userPromises = listUser.map(async (user) => {
        let cost = 0;
        for (const area of user.areaCost) {
            console.log(area , "area")
            const areaDetail = await detailareaMarket({ _id:area });
            console.log(areaDetail," areadetail");
            if(areaDetail)
            cost += areaDetail.priceCost;
        console.log(cost," cost")
        }
        return new USER(user._id, cost);
    });

    // Đợi tất cả các promises hoàn thành
    const userObjects = await Promise.all(userPromises);

    // Cập nhật unpaid cho tất cả user
    const updatePromises = userObjects.map(user => user.updateUserUnpaid());

    // Đợi tất cả các cập nhật hoàn thành
    await Promise.all(updatePromises);

    console.log('All users updated successfully');
}
