# 🔐 Create Admin User - Quick Setup Script

## Use this PowerShell command or Postman to create your first admin user

### Option 1: Using PowerShell (Copy & Paste)

```powershell
$body = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "admin123"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/register" -Body $body -ContentType "application/json"
```

### Option 2: Using curl

```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

### Option 3: Using Postman

1. **Method:** POST
2. **URL:** `http://localhost:5000/api/auth/register`
3. **Headers:** 
   - Content-Type: `application/json`
4. **Body (raw JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

---

## 📝 Default Admin Credentials (After Running Above)

- **Email:** admin@example.com
- **Password:** admin123

⚠️ **IMPORTANT:** Change these credentials in production!

---

## 🧪 Test Login

After creating the admin user, test login:

### Using PowerShell:

```powershell
$loginBody = @{
    email = "admin@example.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/login" -Body $loginBody -ContentType "application/json"
```

This should return a JWT token and user object.

---

## ✅ Next Steps

1. Run one of the commands above to create admin user
2. Go to `http://localhost:5173/admin/login`
3. Login with the credentials
4. Access the dashboard to manage feedback!
