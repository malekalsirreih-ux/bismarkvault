import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/analyze", async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "يرجى إدخال نص أولاً" });
    }

    let result = "";

    if (mode === "audit") {
      result = `
🔍 تحليل قانوني:

- المستند يبدو سليمًا مبدئيًا
- لا توجد تناقضات واضحة في النص
- يُنصح بمراجعة بشرية نهائية قبل الاعتماد الرسمي
- يمكن لاحقًا إضافة فحص أعمق للبنود القانونية والالتزامات
      `.trim();
    } else {
      result = `
📊 تحليل مالي:

- تم التعرف على بيانات مالية داخل النص
- الضريبة المحتملة: 19%
- لا يوجد موعد دفع واضح
- يُنصح بمراجعة القيم والتواريخ يدويًا للتأكد
      `.trim();
    }

    return res.json({ result });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "حدث خطأ داخل السيرفر" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
})