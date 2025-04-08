from django.core.management.base import BaseCommand
import re
from django.db import connection

class Command(BaseCommand):
    help = 'Restore product-collection relationships from backup'

    def handle(self, *args, **options):
        backup_file = input('Enter path to backup file (e.g., /path/to/backup0603.sql): ')
        
        self.stdout.write('Reading backup file...')
        
        # Читаем только INSERT-ы для collections
        inserts = []
        collection_data = []
        
        with open(backup_file, 'r') as f:
            for line in f:
                if 'INSERT INTO public.collections' in line:
                    inserts.append(line.strip())

        if not inserts:
            self.stdout.write(self.style.ERROR('No collection data found in backup!'))
            return

        self.stdout.write(f'Found {len(inserts)} collection inserts')
        
        proceed = input('Do you want to proceed with restoration? [y/N]: ')
        if proceed.lower() != 'y':
            self.stdout.write('Restoration cancelled')
            return

        with connection.cursor() as cursor:
            try:
                # Создаем временную таблицу
                cursor.execute("""
                    CREATE TEMP TABLE collections_backup (
                        id integer,
                        product_id integer,
                        name varchar(255),
                        price varchar(255),
                        discount_price varchar(255),
                        discount_percent varchar(255),
                        collection_url varchar(255),
                        order_field integer
                    )
                """)

                # Вставляем данные из бэкапа
                for insert in inserts:
                    cursor.execute("INSERT INTO collections_backup " + insert.replace('INSERT INTO public.collections', ''))

                # Обновляем существующие коллекции
                cursor.execute("""
                    UPDATE collections c
                    SET product_id = b.product_id
                    FROM collections_backup b
                    WHERE c.id = b.id
                """)

                # Проверяем результат
                cursor.execute("SELECT COUNT(*) FROM collections WHERE product_id IS NOT NULL")
                updated_count = cursor.fetchone()[0]
                
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully restored {updated_count} collection relationships')
                )

            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Error during restoration: {str(e)}')
                )
                
            finally:
                cursor.execute("DROP TABLE IF EXISTS collections_backup")

        # Показываем итоговую статистику
        cursor.execute("SELECT COUNT(*) FROM collections WHERE product_id IS NOT NULL")
        final_count = cursor.fetchone()[0]
        self.stdout.write(f'\nFinal state: {final_count} collections have product relationships')