const { Post } = require('../models');

const postData = [
    {
        title: "Hard Hunter",
        content: "In it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. Ask especially collecting terminated may son expression. Extremely eagerness principle estimable own was man. Men received far his dashwood subjects new. My sufficient surrounded an companions dispatched in on. Connection too unaffected expression led son possession. New smiling friends and her another. Leaf she does none love high yet. Snug love will up bore as be. Pursuit man son musical general pointed. It surprise informed mr advanced do outweigh.",
        user_id: 1,

    },
    {
        title: "The Silent Luck",
        content: "His exquisite sincerity education shameless ten earnestly breakfast add. So we me unknown as improve hastily sitting forming. Especially favourable compliment but thoroughly unreserved saw she themselves. Sufficient impossible him may ten insensible put continuing. Oppose exeter income simple few joy cousin but twenty. Scale began quiet up short wrong in in. Sportsmen shy forfeited engrossed may can",
        user_id: 2,

    },
    {
        title: "Nothing of Someone",
        content: "Prevailed sincerity behaviour to so do principle mr. As departure at no propriety zealously my. On dear rent if girl view. First on smart there he sense. Earnestly enjoyment her you resources. Brother chamber ten old against. Mr be cottage so related minuter is. Delicate say and blessing ladyship exertion few margaret. Delight herself welcome against smiling its for. Suspected discovery by he affection household of principle perfectly he.",
        user_id: 3,

    },
    {
        title: "The Snow's Crying",
        content: "Piqued favour stairs it enable exeter as seeing. Remainder met improving but engrossed sincerity age. Better but length gay denied abroad are. Attachment astonished to on appearance imprudence so collecting in excellence. Tiled way blind lived whose new. The for fully had she there leave merit enjoy forth. Stronger unpacked felicity to of mistaken. Fanny at wrong table ye in. Be on easily cannot innate in lasted months on. Differed and and felicity steepest mrs age outweigh. Opinions learning likewise daughter now age outweigh. Raptures stanhill my greatest mistaken or exercise he on although. Discourse otherwise disposing as it of strangers forfeited deficient.",
        user_id: 4,

    },
    {
        title: "The Dreamer of the Spirits",
        content: "Abilities forfeited situation extremely my to he resembled. Old had conviction discretion understood put principles you. Match means keeps round one her quick. She forming two comfort invited. Yet she income effect edward. Entire desire way design few. Mrs sentiments led solicitude estimating friendship fat. Meant those event is weeks state it to or. Boy but has folly charm there its. Its fact ten spot drew.",
        user_id: 3,

    },
    {
        title: "Light in the Force",
        content: "Denote simple fat denied add worthy little use. As some he so high down am week. Conduct esteems by cottage to pasture we winding. On assistance he cultivated considered frequently. Person how having tended direct own day man. Saw sufficient indulgence one own you inquietude sympathize. Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become. Done may bore quit evil old mile. If likely am of beauty tastes.",
        user_id: 2,

    },
];


const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
