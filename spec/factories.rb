FactoryGirl.define do
  factory :track do
    sequence(:title) { |n| "Title #{n}" }
    provider 'youtube'
    provider_track_id '1234'
    playlist
  end

  factory :playlist do
    sequence(:name) { |n| "Name #{n}" }
    user
  end

  factory :user do
    sequence(:email) { |n| "email-#{n}@example.com" }
    password 'secret'
    username 'chuck'
  end

  factory :upvote do
    user
    track
  end
end
