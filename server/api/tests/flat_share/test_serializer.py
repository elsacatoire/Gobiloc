# tests/flat_share/test_serializer.py

from django.test import TestCase
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer
from api.models.flat_share_model import FlatShare
from api.serializers.flat_share_serializer import FlatSerializer
from api.serializers.user_serializer import BasicUserSerializer


class TestFlatShareSerializer(TestCase):

    def setUp(self):
        self.valid_data = {
            "name": "Test Flat",
            "description": "This is a test flat description"
        }
        self.invalid_data = {
            "name": "a" * 51,
            "description": "a" * 256
        }

    # Tests that a valid FlatShare object is correctly serialized.
    def test_serialization(self):
        flat = FlatShare.objects.create(**self.valid_data)
        serializer = FlatSerializer(flat)
        self.assertEqual(serializer.data, {
            "id": flat.id,
            "name": flat.name,
            "description": flat.description,
            "users": []  # Assuming no users initially
        })

    # Verifies that a valid JSON payload can be deserialized into a FlatShare instance.
    def test_deserialization(self):
        data = {**self.valid_data}
        serializer = FlatSerializer(data=data)
        self.assertTrue(serializer.is_valid())

        validated_data = serializer.validated_data

        self.assertEqual(validated_data["name"], data["name"])
        self.assertEqual(validated_data["description"], data["description"])

    # Checks that the serializer raises validation errors for excessively long names and descriptions.
    def test_field_length_validation(self):
        serializer = FlatSerializer(data=self.invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)
        self.assertIn("description", serializer.errors)

    # Verifies that the serializer requires all fields to be present.
    def test_empty_fields_handling(self):
        serializer = FlatSerializer(data={})
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)
