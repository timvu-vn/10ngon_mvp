// Make wordList and functions available globally
window.wordList = [
    "tôi", "và", "bạn", "là", "có", "không", "của", "trong", "một", "những",
    "người", "được", "cho", "về", "này", "các", "đến", "với", "để", "từ",
    "khi", "đã", "như", "sẽ", "tại", "theo", "sau", "nhiều", "phải", "năm",
    "thì", "vì", "nói", "làm", "lên", "đây", "vào", "nhưng", "cũng", "còn",
    "bởi", "mà", "đang", "trên", "việc", "nên", "hay", "nếu", "được", "rất",
    "mới", "đều", "biết", "thêm", "vẫn", "qua", "lại", "ông", "họ", "điều",
    "giờ", "lúc", "chỉ", "thấy", "đó", "nhà", "ra", "ngày", "chơi", "học",
    "thế", "quá", "đi", "xem", "hai", "sao", "phim", "trước", "cả", "đời",
    "thật", "chưa", "vậy", "mình", "cần", "sống", "nhất", "đẹp", "chọn", "yêu",
    "muốn", "nơi", "mọi", "cùng", "thích", "bao", "giờ", "sách", "viết", "đọc"
];

// Shuffle array function
window.shuffleArray = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Get random words
window.getRandomWords = function(count = 200) {
    const shuffled = window.shuffleArray([...window.wordList]);
    const needed = Math.ceil(count / shuffled.length);
    const repeated = Array(needed).fill(shuffled).flat();
    return window.shuffleArray(repeated).slice(0, count);
};
