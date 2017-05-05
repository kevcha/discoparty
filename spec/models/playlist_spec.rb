require 'rails_helper'

describe Playlist do
  it { should have_many(:tracks) }
  it { should belong_to(:user) }

  it { should validate_presence_of(:name) }
end
