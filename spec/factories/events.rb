FactoryBot.define do
  factory :event do
    kind { "Symposium" }
    date { "2022-07-14".to_date }
    title { "Ada Lovelace — The Making of a Computer Scientist" }
    speaker { "Monica S. Lam, Yoky Matsuoka, Dorit Aharonov" }
    host { "Ursula Martin" }
    published { false }
  end
end
