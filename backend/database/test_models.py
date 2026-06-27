"""
Test Models File
"""

from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class TestModel(Base):
    __tablename__ = "test_models"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
