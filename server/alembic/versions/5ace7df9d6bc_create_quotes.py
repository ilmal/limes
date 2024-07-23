"""create quotes

Revision ID: 5ace7df9d6bc
Revises: 
Create Date: 2024-07-22 21:21:19.772220

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5ace7df9d6bc'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'quotes',
        sa.Column('name', sa.String(255), nullable=True),
        sa.Column('quote', sa.String(255), nullable=True),
    )
    pass


def downgrade() -> None:
    op.drop_table('quotes')
    pass
