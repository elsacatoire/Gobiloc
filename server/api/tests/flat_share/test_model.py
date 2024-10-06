# tests/flat_share/test_model.py

from django.core.exceptions import ValidationError
from django.test import TestCase
from api.models.flat_share_model import FlatShare


class TestFlatShareModel(TestCase):

    def test_flat_share_creation(self):
        flat = FlatShare(name='Test Flat', description='This is a test flat')
        flat.save()
        self.assertIsNotNone(flat.id)

    def test_flat_share_name_length(self):
        with self.assertRaises(ValidationError):
            FlatShare(name='a' * 51, description='Test').full_clean()

    def test_flat_share_description_length(self):
        with self.assertRaises(ValidationError):
            FlatShare(name='Test', description='a' * 256).full_clean()

    def test_flat_share_name_max_length(self):
        max_length = FlatShare._meta.get_field('name').max_length
        with self.assertRaises(ValidationError):
            FlatShare(name='a' * (max_length + 1), description='Test').full_clean()

    def test_flat_share_description_max_length(self):
        max_length = FlatShare._meta.get_field('description').max_length
        with self.assertRaises(ValidationError):
            FlatShare(name='Test', description='a' * (max_length + 1)).full_clean()

    def test_flat_share_creation_without_description(self):
        flat = FlatShare(name='Test Flat')
        flat.save()
        self.assertIsNotNone(flat.id)
        self.assertIsNone(flat.description)
