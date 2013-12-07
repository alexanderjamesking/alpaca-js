Feature: Multicast
  As a developer
  I want to be able to send a message to multiple recipients
  So that I can process messages asynchronously

  Scenario: Message should be sent to all consumers
    Given a "multicast" route which sends messages to two consumer processors
    When I send an exchange to the "multicast" route
    Then both consumer processors receive the message

  Scenario: Message should be unchanged after copy sent to multicast consumers
    Given a "multicast" route which sends messages to two consumer processors
    When I send an exchange to the "multicast" route
    Then the exchange should contain the original, unmodified message