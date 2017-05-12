require 'rails_helper'

describe Track do
  it { should belong_to(:playlist) }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:provider) }
  it { should validate_presence_of(:provider_track_id) }
  it { should validate_presence_of(:playlist) }
end
