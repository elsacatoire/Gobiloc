from django.test import TestCase
from rest_framework.test import APIClient
from api.models.flat_share_model import FlatShare
import json


class FlatShareViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_payload = {
            "name": "Test Flat",
            "description": "A test flat"
        }
        self.invalid_payload = {
            "name": "",
            "description": "",
        }

    def test_create_flatShare(self):
        # WHEN
        response = self.client.post('/api/flats/', data=json.dumps(self.valid_payload), content_type='application/json')
        # THEN
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {"flat": "created", "data": self.valid_payload})

    def test_invalid_create_flatShare(self):
        print("coucou")
        # WHEN
        response = self.client.post('/api/flats/', data=json.dumps(self.invalid_payload), content_type='application/json')
        # THEN
        self.assertEqual(response.status_code, 400)
        #self.assertEqual(response.json(), {"flat": "created", "data": self.valid_payload})

    def test_get_flatShare_by_id(self):
        # GIVEN
        flat_share = FlatShare.objects.create(**self.valid_payload)
        # WHEN
        response = self.client.get(f'/api/flats/{flat_share.id}/')
        # THEN
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), self.valid_payload)
