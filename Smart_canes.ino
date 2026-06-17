const int trigPin2 = 13;
const int echoPin2 = 12;
const int buzzerPin = 8;
const int vibratePin = 6;
const int lightPin = 7;
const int ldrPin = A0;

int ldrValue;

void setup() {
    pinMode(trigPin2, OUTPUT);
    pinMode(echoPin2, INPUT);
    pinMode(buzzerPin, OUTPUT);
    pinMode(vibratePin, OUTPUT);
    pinMode(ldrPin, INPUT);
    pinMode(lightPin, OUTPUT);

    Serial.begin(9600);
}

long getDistance(int trigPin, int echoPin) {
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);

    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);

    digitalWrite(trigPin, LOW);

    long duration = pulseIn(echoPin, HIGH);
    long distance = duration * 0.034 / 2;

    return distance;
}

void loop() {

    // --- Ultrasonic sensor ---
    long distance2 = getDistance(trigPin2, echoPin2);

    bool objectDetected = (distance2 < 100);

    // --- LDR ---
    ldrValue = analogRead(ldrPin);

    Serial.print("Distance2: ");
    Serial.print(distance2);
    Serial.print(" cm\tLDR: ");
    Serial.println(ldrValue);

    // If an obstacle is detected (within 100 cm), activate buzzer
    if (objectDetected) {
        tone(buzzerPin, 1000);
        delay(500);

        noTone(buzzerPin);
        delay(500);

        digitalWrite(vibratePin, HIGH);
    } 
    else {
        digitalWrite(buzzerPin, LOW);
        digitalWrite(vibratePin, LOW);
    }

    // If the LDR value is below threshold, turn on light
    if (ldrValue < 400) {   // Adjust threshold depending on light conditions
        digitalWrite(lightPin, HIGH);
    } 
    else {
        digitalWrite(lightPin, LOW);
    }

    delay(200);
}