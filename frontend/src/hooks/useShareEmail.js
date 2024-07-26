import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const useShareEmail = () => {

    const { token } = useSelector((e) => e.auth);


    const shareFileFolder = async ({ id, emails }) => {
        try {
            console.log(id, emails)
            const res = await fetch(`${process.env.BACKEND_URL}/api/v1/file-folder/share`, {
                method: "POST",
                body: JSON.stringify({ id, data: emails }),
                headers: {
                    "content-Type": "application/json",
                    authorization: "Bearer " + token,
                }
            });

            const data = await res.json();
            console.log(data);
            alert(data.message);
        }
        catch (e) {
            console.log(e.message);
            alert("Error: " + e.message);
        }
    }
    return { shareFileFolder };
};

export default useShareEmail;