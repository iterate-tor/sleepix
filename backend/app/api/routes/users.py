from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.security import decode_access_token
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.schemas.user import UserOut

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user_id: str = payload.get("sub")
    result = await db.execute(select(User).where(User.id == int(user_id)))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


# HR role guard
async def require_hr(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role not in {"hr", "admin"}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="HR role required")
    return current_user


@router.get("/me", response_model=UserOut)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user 

# Admin endpoint to change user role
@router.patch("/{user_id}/role", response_model=UserOut)
async def update_user_role(user_id: int, role: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin role required")

    if role not in {"user", "hr", "admin"}:
        raise HTTPException(status_code=400, detail="Invalid role")

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.role = role
    await db.commit()
    await db.refresh(user)
    return user 