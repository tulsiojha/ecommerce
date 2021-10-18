import os

import firebase_admin
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone
from firebase_admin import auth
from firebase_admin import credentials
from rest_framework import authentication
from rest_framework import exceptions

from .exceptions import FirebaseError
from .exceptions import InvalidAuthToken
from .exceptions import NoAuthToken

cred = credentials.Certificate(
    {
        "type": "service_account",
        "project_id": "mart-5dd72",
        "private_key_id": "92ada319189b74df20e8393e022f77f3efdc533e",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD4bdaESC2ECOd3\nvCONPyfwZCq0GTMUAA9USonPfS2AlFbqnr7rR1u1ZgUbtlaXIv/7Iw89TNdtAHd7\nVejX+xy3cHfTCK0ch88wgiGrFJ2DLiI7TUzJHbuimxHh/SaC9zbAOlu23OxA/u4a\n4VDqFyfm/9E2vHrGnVzqMjd4w8rm5RoRY36FGxW9F4v3maBP+MHuDkKahSn9ad6d\nCof8VP+qmbh/FAfoUUPNS/GPVNCEhGNb0qaXsM/t3MYBzcvbskFNn8BbWJbdwqXH\nsr15nPsA4DibLh4i1BRvTCpBu1lix6jp0BSNzzRFRn+yfyYVjEnxD85jHPrH5Kn+\nE3OOLearAgMBAAECggEAC4Bjp5vYhkiL6tu01lO/th31FNcmfxJiTffmJHXlAZMc\nk7Uwx/TK9qgtVrNHlAIPUYxgfBPkKgw/poqmLTsCK9ioUNwRzlnX9PokCTx67w6s\n5WD2oUhf868ekf9l5TdWe2otl9bnleTCQk//LoSkQ3TBi2QI18wuTTtw8lriOHP4\njzkWoCfKj46U3mYzSRmGUwwapvNavVuHI14RaLf4PPHXY0wh+uvwV+lxqkrqHm6c\nnlqP4NGQiMtb1ycxWt95EbObAIMCjHnJ8wehTimsuzwEala+gFSUiEJS16tMpd5v\nEcWUwKRLF54yLe3OY7b68L+RasdDaKoMkJjHspJYdQKBgQD8mK1y+V28BupHTKJi\nTfGXqQAxJ79FOrBMi7DUAA3otkVLbKCVcOx5HH4OK5ZI9sbaj6ygZGN6DK0JMOTE\n/J4KOUYW7xobkCcf2WVgtwM0T8w4bnc2q4PNfRGmyDJ0QsCmTdDA5I9/plktc+Yt\ntTxQk2DkjON62J9nNMBW4nkp3wKBgQD7xskKquFNj4zlhoZvTFyu10OrhZZna+ze\nj2ndfI/oHvH6QfNuRXO7P7/Db0hRMEdIOjJ2sWbJQbtK0FhQOkk4UPidyJpNR3nh\nAxt76Tsa6sgt7kPyN56dTQaEfOI0YPki2bP+hkz9D+CcuIRUDySfJw0oU9qfCDEs\ny4ulEj40tQKBgQDvq1IP4Gm+6XTLV/xPeBM+Sl1jRopmfowe5QBP9wk7gA55xUUM\n5ouJUq6MdXDwJC6D3IT33qjAelyIdvrpqaOuoa9OPWoxMvLcdmKJhLymmvxzouS8\nW7sAc6YW8KdmxpuScA0dqQA7JzRAO1LwlaD39w6dbMy+l+GPhG7nQZWjUwKBgGB6\nTuVoj4ch/9KgFvmlIErbMBIU0Yp138F04RM/PQGsgfrstLRHps5U4k2oYeTChD4Y\nFuhGmGV8a6GCbqTngNE0reAAU6hTQE/J2glEWSK6XtTC3YR+bahHML0qAaAinLUP\nCRr6KZw7Lk2/ou13FAhsdW1DnJ2eDQHmSW+Kqw2VAoGASYfEU0UJgGanSJp/+j1p\nJapoEEORM+2LZtLK8Hf6aZpCcwWXs7pUG36FnrGWHpNC7EwbVlFkCdHYKIQf4kDD\nT/Nn7dQ7QmNuLdzqOPywRRzGofC8uk71PoUJoilFVj3kt2h8Fw7WumXJ4TwOQTsp\nGggifgQx2pGkXeuDXeYMu34=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-3org1@mart-5dd72.iam.gserviceaccount.com",
        "client_id": "102176174466713788750",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3org1%40mart-5dd72.iam.gserviceaccount.com"
    }
)

default_app = firebase_admin.initialize_app(cred)


class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header:
            # raise NoAuthToken("No auth token provided")
            return None

        id_token = auth_header.split(" ").pop()
        decoded_token = None
        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception:
            raise InvalidAuthToken("Invalid auth token")
            pass

        if not id_token or not decoded_token:
            return None

        try:
            phoneNumber = decoded_token.get("phone_number")
            print(decoded_token)
        except Exception:
            raise FirebaseError()

        user, created = User.objects.get_or_create(username=phoneNumber)
        print(user)
        # user.profile.last_activity = timezone.localtime()

        return (user, None)
