require 'rails_helper'

describe User do
  it { should have_many(:playlists) }
  it { should have_many(:upvotes) }
end
