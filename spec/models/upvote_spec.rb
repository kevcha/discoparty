require 'rails_helper'

describe Upvote do
  it { should belong_to(:track) }
  it { should belong_to(:user) }

  it { should validate_presence_of(:track) }
  it { should validate_presence_of(:user) }
end
