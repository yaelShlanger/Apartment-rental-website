const jwt = require('jsonwebtoken')
const multer = require('multer')


const fileFilter = (req, file, cb) => {
    //במקרה שלנו נאפשר רק קבצי בסיומת תמונה
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //true אם הקובץ מסוג מתאים נחזיר 
        cb(null, true)
    }
    //ואם לא - false
    cb(null, false)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

module.exports = {
    logUrl: (req, res, next) => {
        console.log(req.url);
        next()
    },
    // Autentication - אימות
    // Authorization - הרשאה

    checkAuth: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(403).send({ error: `Authorization failed1!` })
        }
        const token = req.headers.authorization.split(' ')[0]
        if (!token) {            
            return res.status(405).send({ error: `Authorization failed!2` })
        }

        // jwt.verify - זיהוי הטוקן - האם הוא תקין
        // מקבלת שלשה ארגומנטים:
        // 1. את הטוקן שנשלח מהלקוח
        // 2. את המחרוזת הייחודית של המערכת
        // 3. פונקצייה שמקבלת שגיאה או את הפיענוח
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                return res.status(406).send({ message: `Authorization failed!3`, error })
            }
            // decoded = מפוענח
            if (decoded) {
                next()
            }
        })
    },
    upload: multer({
        // dest: 'uploads/',
        storage,
        //הגדרות לגבי הקובץ המועלה
        limits: {
            //2MB הקובץ יכול להיות עד גודל של 
            fileSize: 1024 * 1024 * 2
        },
        fileFilter
    })
}