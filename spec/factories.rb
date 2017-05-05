FactoryGirl.define do
  factory :track do
    sequence(:title) { |n| "Title #{n}" }
    sequence(:artist) { |n| "Artist #{n}" }
    provider 'deezer'
    provider_track_id '1234'
    playlist
  end

  factory :playlist do
    sequence(:name) { |n| "Name #{n}" }
    user
  end

  factory :user do
  end
end
