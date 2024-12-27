// pages/map/[id].js
import { useRouter } from "next/router";

const TopicPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Sayfa {id}</h1>
            <p>Bu içerik {id} numaralı konuya ait olacaktır.</p>
        </div>
    );
};

export default TopicPage;
