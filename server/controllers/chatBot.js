const dotenv = require('dotenv')

dotenv.config()

module.exports = {

    reply: async (req, res) => {
        const message = req.body.message;
    
        // הגדרת התשובה כברירת מחדל
        let reply = "נסה בבקשה ניסוח אחר כדי שאוכל להבין את שאלתך";
    
        // בדיקת שאלות ובקשות נוספות בעברית
        if (message.includes('דירות נופש')) {
            // בקשת GET ל-API של דירות נופש
            try {
                // דוגמה של החזרת רשימת דירות נופש מ-API דמי
                const response = await axios.get('https://api.example.com/v1/apartments');
                const apartments = response.data.apartments;
                reply = " רשימת דירות הנופש:";
                apartments.forEach(apartment => {
                    reply += `\n- ${apartment.name}, ${apartment.location}, מחיר: ${apartment.price}`;
                });
            } catch (error) {
                reply = "יש לגשת בתפריט לקישור המתאים";
            }
        } else if (message.includes('הזמנה')) {
            // הוספת לוגיקה להזמנת דירות נופש
            reply = "לא ניתן לבצע הזמנה כרגע. אנא נסה שוב מאוחר יותר.";
        }
        else if (/^[a-zA-Z\s]*$/.test(message)) {
            // תגובה להודעה באנגלית
            reply = "I'm sorry, I can only respond to messages in Hebrew. Please write your message in Hebrew.";
        } else if (message.includes('מחיר') || message.includes('עלות') || message.includes('עולה')) {
            // תגובה לשאלה המכילה את המילה "מחיר"
            reply = "מחירי הדירות נופש יכולים להשתנות בהתאם למיקום, לתקופת השהייה ולשירותים הכלולים. ניתן לפנות אלינו לקבלת מידע נוסף.";
        }
        else if (message.includes('פתיחה') || message.includes('שעות') ) {
            // תגובה לשאלה המכילה את המילה "שעות"
            reply = "המשרד פעיל בימים א'-ה' משמונה עד שמונה";
        }
        else if (message.includes('טלפון') || message.includes('פלאפון') ) {
            // תגובה לשאלה המכילה את המילה "טלפון"
            reply = "0583202575 ";
        }
        else if (message.includes('קשר') || message.includes('צור')) {
            // תגובה לבקשה המכילה את המילים "צור קשר"
            reply = "ניתן ליצור קשר עמנו בכתובת האימייל contact@example.com או במספר הטלפון 123-4567890.";
        }
        else if (message.includes('תודה') || message.includes('עזרת') || message.includes('מצוין') || message.includes('מעולה')) {
            // תגובה לשאלה המכילה את המילה "מחיר"
            reply = "שמחתי לעזור. אני כאן עבור כל שאלה נוספת";
        }
    
        // החזרת התשובה ללקוח
        res.json({ message: reply });
    }
    }