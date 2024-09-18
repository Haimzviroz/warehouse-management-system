/////////interface////////////
interface Scooter {
  serialNumber?: string; // מזהה ייחודי
  model: string; // דגם הקורקינט
  batteryLevel: number; // מצב סוללה )0-100)
  imageUrl: string; // לינק לתמונה
  color: string; // סטרינג שמכיל צבע. #101010
  status: "available" | "inRepair" | "unavailable"; //סטטוס הקורקינט
}
//////////////CRUD/////////////

const BASE_URL = "https://66e979d387e4176094499730.mockapi.io/api/v1/scooter/";
//tester obj
const TesterScoot: Scooter = {
  status: "available",
  batteryLevel: 99,
  color: "101010",
  imageUrl: "exam.com.jpg",
  model: "Xiaomi",
};

//.1 הוספת קורקינט: הוספת קורקינט חדש למלאי עם פרטים כגון מספר סידורי, דגם, מצב סוללה ומיקום נוכחי.
async function creteScooter(scooter: Scooter): Promise<void> {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scooter),
    });
    if (!res.ok) {
      throw new Error("network error");
    }
    const data = await res.json();
    console.log(res.status, data);
  } catch (error) {
    console.log(error);
  }
}

// creteScooter(TesterScoot);

// .2 מחיקת קורקינט: הסרת קורקינט מהמלאי על פי המספר הסידורי שלו.
async function deleteScooter(id: number): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("network error");
    }
    const data = await res.json();
    console.log(res.status, data);
  } catch (error) {
    console.log(error);
  }
}
// deleteScooter(6);

// .3 עריכת קורקינט: עדכון פרטים של קורקינט קיים, כגון מצב סוללה או מיקום.

async function updateScooter(id: number, scooter: Scooter): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scooter),
    });
    if (!res.ok) {
      throw new Error("network error");
    }
    const data = await res.json();
    console.log(res.status, data);
  } catch (error) {
    console.log(error);
  }
}
// updateScooter(1, TesterScoot);
// .4 הצגת קורקינט/ים: הצגת פרטי קורקינט מסוים או רשימה של כל הקורקינטים במלאי.
async function getAllScooters(): Promise<Scooter[]> {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("network error");
    const data: Scooter[] = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getScooter(id: number): Promise<Scooter> {
  try {
    const res = await fetch(`${BASE_URL}${id}`);
    if (!res.ok) throw new Error("network error");
    const data: Scooter = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
