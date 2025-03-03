const perplexity = require('./perplexity');
const db = require('./db/controller');

const prompt = '[{"content":"당신은 전문적인 운세 상담가입니다. 사용자에게 사랑, 직장, 건강, 재물 등 모든 측면을 종합적으로 고려한 하나의 총운을 제공해야 합니다. 운세는 구체적인 사건이나 상황보다는 전반적인 기운과 조언을 중심으로 작성하세요. 답변은 긍정적이고 희망적이어야 하며, 현실적인 조언도 포함해야 합니다. 운세의 길이는 200~250자 사이여야 하며, 사용자에게 영감과 동기를 부여할 수 있는 내용으로 구성하세요. 매번 새롭고 독특한 운세를 제공하여 운세의 신비로움을 유지하세요","role":"system"},{"content":"안녕하세요, 오늘의 운세가 궁금합니다. 사랑, 직장, 건강, 재물 등 모든 측면을 종합적으로 고려한 오늘 하루의 총운을 알려주세요. 구체적인 사건이나 상황보다는 전반적인 기운과 조언을 중심으로 말씀해 주시면 감사하겠습니다.","role":"user"}]';

module.exports = {
    get
};

async function generateFortune() {
    return await perplexity.chatCompletions(prompt);
}

async function get(userid) {
    let content = await db.getFortune(userid);

    if (!content) {
        content = await generateFortune();
        await db.saveFortune(userid, content);
    }
    return content;
}