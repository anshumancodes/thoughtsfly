
| Status Code | Meaning | When Used |
|------------|---------|------------|
| `200 OK` | Success | Repost deleted successfully |
| `201 Created` | Resource Created | New repost added successfully |
| `400 Bad Request` | Invalid Input | Post already retweeted, missing post ID |
| `404 Not Found` | Resource Not Found | Repost not found or unauthorized deletion |
| `500 Internal Server Error` | Unexpected Error | Server/database failure |
