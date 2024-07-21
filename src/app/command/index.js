import updateUserUnpaid from "./run_any_day";
import cron from 'node-cron';


// Thiết lập tác vụ hàng ngày

export default function runAllways() {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running updateUserUnpaid task');
        try {
            await updateUserUnpaid();
            console.log('updateUserUnpaid task completed successfully');
        } catch (error) {
            console.error('Error running updateUserUnpaid task:', error);
        }
    });
}
